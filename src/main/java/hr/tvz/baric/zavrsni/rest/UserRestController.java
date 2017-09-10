package hr.tvz.baric.zavrsni.rest;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

import javax.security.auth.callback.NameCallback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import hr.tvz.baric.zavrsni.SecurityUtils;
import hr.tvz.baric.zavrsni.helper.PregledPacijentaStatus;
import hr.tvz.baric.zavrsni.helper.UserRoles;
import hr.tvz.baric.zavrsni.model.Doktor;
import hr.tvz.baric.zavrsni.model.Pacijent;
import hr.tvz.baric.zavrsni.model.Pregled;
import hr.tvz.baric.zavrsni.model.PregledPacijenta;
import hr.tvz.baric.zavrsni.model.UserInfo;
import hr.tvz.baric.zavrsni.model.UserRole;
import hr.tvz.baric.zavrsni.repo.DoktorJpaRepo;
import hr.tvz.baric.zavrsni.repo.PacijentJpaRepo;
import hr.tvz.baric.zavrsni.repo.PregledJpaRepo;
import hr.tvz.baric.zavrsni.repo.PregledPacijentaJpaRepo;
import hr.tvz.baric.zavrsni.repo.UserInfoJpaRepo;
import hr.tvz.baric.zavrsni.repo.UserRoleJpaRepo;

@RestController
@RequestMapping("/api/user")
public class UserRestController {
	
	@Autowired
	UserInfoJpaRepo userInfoRepo;
	
	@Autowired
	UserRoleJpaRepo userRoleRepo;
	
	@Autowired
	PacijentJpaRepo pacijentRepo;
	
	@Autowired
	DoktorJpaRepo doktorRepo;
	
	@Autowired
	PregledJpaRepo pregledRepo;
	
	@Autowired
	PregledPacijentaJpaRepo pregledPacijentaRepo;
	
	@GetMapping
	@PreAuthorize("hasAuthority('admin')")
	public List<UserInfo> getAllUserInfo(){
		List<UserInfo> usersInfo = userInfoRepo.findAll();
		return usersInfo;
	}
	
	@PreAuthorize("hasAuthority('admin')")
	@GetMapping("/user_role")
	public List<UserRole> userRoles() {
		List<UserRole> userrRoles = userRoleRepo.findAll();
		return userrRoles;
	}
	
	@GetMapping("/getUser")
	public UserInfo getUserAccount() {
		UserInfo userInfo = userInfoRepo.findByUsername(SecurityUtils.getCurrentUsername());
		return userInfo;
	}
	
	@GetMapping("getUserById/{userId}")
	public UserInfo getUserById(@PathVariable Long userId) {
		UserInfo user = userInfoRepo.findById(userId);
		
		return user;
	}
	
	@PostMapping
	public UserInfo insertUserInfo(@RequestBody UserInfo userInfo){
		UserInfo existingUser = userInfoRepo.findByUsername(userInfo.getUsername());		
		if (existingUser != null) {
			return null;
		}
		userInfo.setId(null);
		UserRole userRole = userRoleRepo.findByNaziv("pacijent");
		userInfo.setUserRole(userRole);
		userInfo.setStatus(0);
		userInfoRepo.save(userInfo);
		
		Pacijent pacijent = new Pacijent();
		pacijentRepo.save(pacijent);
		
		userInfo.setPacijent(pacijent);
		
		return userInfoRepo.saveAndFlush(userInfo);
	}
	
	@PutMapping
	public UserInfo updateUser (@RequestBody UserInfo userInfo){
		if (userInfo.getUserRole().getNaziv().equals(UserRoles.pacijent.name())) {
			Pacijent pacijent = userInfo.getPacijent();
			pacijentRepo.save(pacijent);
			UserInfo userByOib = userInfoRepo.findByOib(userInfo.getOib());
			if (userByOib != null && userByOib.getId() != userInfo.getId()) {
				return null;
			}
		} else if (userInfo.getUserRole().getNaziv().equals(UserRoles.doktor.name())) {
//			Doktor doktor = userInfo.getDoktor();
//			doktorRepo.save(doktor);
		}
		
		return userInfoRepo.saveAndFlush(userInfo);
	}
	
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable Long id) {
		if (userInfoRepo.findById(id) == null) {
			return;
		}
		
		UserInfo userInfo = userInfoRepo.findById(id);
		userInfoRepo.delete(userInfo.getId());	
		
		if (userInfo.getUserRole().getNaziv().equals(UserRoles.pacijent.name())) {
			Pacijent pacijent = userInfo.getPacijent();
			pacijentRepo.delete(pacijent.getId());
		} else if (userInfo.getUserRole().getNaziv().equals(UserRoles.doktor.name())) {
//			Doktor doktor = userInfo.getDoktor();
//			doktorRepo.delete(doktor.getId());
		}	
	}
	
	@GetMapping("/getAllPregledi/{userId}")
	public List<PregledPacijenta> getAllPregledi (Long userId) {
		UserInfo userInfo = userInfoRepo.findById(userId);
		if (userInfo == null || userInfo.getPacijent() == null) {
			return null;
		}
		
		return userInfo.getPacijent().getPreglediPacijenta();
	}
	
	@PostMapping("addNewPregledToUser/{userId}/{pregledId}/{pickedDateTimestamp}")
	public PregledPacijenta addNewPregledToUser(@PathVariable Long userId, @PathVariable Long pregledId, @PathVariable Long pickedDateTimestamp) {
		// SHIT CODE, SHIT FUNCTION, MAKE IT BETTER LATER!!!
		UserInfo user = userInfoRepo.findById(userId);
		Pregled pregled = pregledRepo.findById(pregledId);		
		if (user == null || pregled == null) {
			return null;
		}
		
		List<PregledPacijenta> existingPregled = pregledPacijentaRepo.findByDateAndPregled_Id(pickedDateTimestamp, pregledId);
		
		if (!existingPregled.isEmpty() || existingPregled.size() > 0) {
			return null;
		}
		
		PregledPacijenta pregledPacijenta = new PregledPacijenta();
		pregledPacijenta.setPregled(pregled);
		pregledPacijenta.setDate(pickedDateTimestamp);

		pregledPacijenta.setStatus(true);
		pregledPacijenta.setPacijent(user.getPacijent());
		Pacijent pacijent = user.getPacijent();
		pregledPacijentaRepo.saveAndFlush(pregledPacijenta);		
		
		List<PregledPacijenta> preglediPacijenta = pacijent.getPreglediPacijenta();
		preglediPacijenta.add(pregledPacijenta);
		userInfoRepo.saveAndFlush(user);
		
		Long timestamp = pregled.getNextDate();
		
		if (pickedDateTimestamp.equals(timestamp)) {
			List<PregledPacijenta> zauzetiPregledi = pregledPacijentaRepo.findByPregled_IdAndDateGreaterThan(pregledId, timestamp);
			Date date = new Date(timestamp);
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			Boolean condition = null;
			Date nextDate = null;
			
			do {
				cal.add(Calendar.HOUR, 2);
				nextDate = new Date(cal.getTimeInMillis());
				if (nextDate.getDay() == 6) {
					cal = Calendar.getInstance();
					cal.setTime(nextDate);
					cal.add(Calendar.DATE, 2);
					nextDate = new Date(cal.getTimeInMillis());
				} else if (nextDate.getDay() == 0) {
					cal = Calendar.getInstance();
					cal.setTime(nextDate);
					cal.add(Calendar.DATE, 1);
					nextDate = new Date(cal.getTimeInMillis());
				}
				condition = true;
				for (PregledPacijenta zauzetPregled : zauzetiPregledi) {
					if (zauzetPregled.getDate().equals(nextDate.getTime())) {
						condition = false;
					}
				}				
			} while (!condition);			
			
			
			pregled.setNextDate(nextDate.getTime());
			pregledRepo.saveAndFlush(pregled);
		}
		
		return pregledPacijenta;
		
	}

}
