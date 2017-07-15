package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.UserRole;

public interface UserRoleJpaRepo extends JpaRepository<UserRole, Long> {

}
