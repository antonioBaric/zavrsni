package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.UserInfo;

public interface UserInfoJpaRepo extends JpaRepository<UserInfo, Long> {

}
