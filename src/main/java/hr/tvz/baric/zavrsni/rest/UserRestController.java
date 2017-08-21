package hr.tvz.baric.zavrsni.rest;

import java.util.List;

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
	
	@PostMapping
	public UserInfo insertUserInfo(@RequestBody UserInfo userInfo){
		UserInfo existingUser = userInfoRepo.findByUsername(userInfo.getUsername());		
		if (existingUser != null) {
			return null;
		}
		userInfo.setId(null);
		UserRole userRole = userRoleRepo.findByNaziv("pacijent");
		userInfo.setUserRole(userRole);
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
		} else if (userInfo.getUserRole().getNaziv().equals(UserRoles.doktor.name())) {
			Doktor doktor = userInfo.getDoktor();
			doktorRepo.save(doktor);
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
			Doktor doktor = userInfo.getDoktor();
			doktorRepo.delete(doktor.getId());
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
	
	@PostMapping("addNewPregledToUser/{userId}/{pregledId}")
	public PregledPacijenta addNewPregledToUser(@PathVariable Long userId, @PathVariable Long pregledId) {
		UserInfo user = userInfoRepo.findById(userId);
		Pregled pregled = pregledRepo.findById(pregledId);		
		if (user == null || pregled == null) {
			return null;
		}
		PregledPacijenta pregledPacijenta = new PregledPacijenta();
		pregledPacijenta.setPregled(pregled);
		//promjeniti kasnije status
		pregledPacijenta.setStatus("Aktivan");
		pregledPacijenta.setPacijent(user.getPacijent());
		Pacijent pacijent = user.getPacijent();
		pregledPacijentaRepo.saveAndFlush(pregledPacijenta);		
		
		List<PregledPacijenta> preglediPacijenta = pacijent.getPreglediPacijenta();
		preglediPacijenta.add(pregledPacijenta);
		userInfoRepo.saveAndFlush(user);
		
		return pregledPacijenta;
		
	}

}
