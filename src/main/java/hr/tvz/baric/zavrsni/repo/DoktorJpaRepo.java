package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.Doktor;

public interface DoktorJpaRepo extends JpaRepository<Doktor, Long> {
	
	

}
