package hr.tvz.baric.zavrsni.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import hr.tvz.baric.zavrsni.SecurityUtils;
import hr.tvz.baric.zavrsni.model.UserInfo;
import hr.tvz.baric.zavrsni.model.UserRole;
import hr.tvz.baric.zavrsni.repo.UserInfoJpaRepo;
import hr.tvz.baric.zavrsni.repo.UserRoleJpaRepo;

@RestController
@RequestMapping("/api/user")
public class UserRestController {
	
	@Autowired
	UserInfoJpaRepo userInfoRepo;
	
	@Autowired
	UserRoleJpaRepo userRoleRepo;
	
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
		
		return userInfoRepo.saveAndFlush(userInfo);
	}

}
