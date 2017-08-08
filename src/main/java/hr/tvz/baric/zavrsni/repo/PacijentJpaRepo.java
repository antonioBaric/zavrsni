package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.Pacijent;

public interface PacijentJpaRepo extends JpaRepository<Pacijent, Long> {
	
	

}
