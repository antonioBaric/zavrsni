package hr.tvz.baric.zavrsni;

import java.util.ArrayList;
import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import hr.tvz.baric.zavrsni.model.UserInfo;
import hr.tvz.baric.zavrsni.repo.UserInfoJpaRepo;

@Component("userDetailsService")
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
	
	@Autowired
	private UserInfoJpaRepo userInfoJpaRepo;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserInfo userInfo = userInfoJpaRepo.findByUsername(username);
		
		if (userInfo == null) {
			throw new UsernameNotFoundException("User" + username + "was not found");
		}
		Collection<GrantedAuthority> grantedAuthorities = new ArrayList<>();
		GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userInfo.getUserRole().getNaziv());
		grantedAuthorities.add(grantedAuthority);
		
		return new User(username, userInfo.getPassword(), grantedAuthorities);
	}

}
