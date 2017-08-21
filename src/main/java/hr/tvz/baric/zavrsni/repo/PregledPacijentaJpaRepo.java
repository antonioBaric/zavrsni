package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.PregledPacijenta;

public interface PregledPacijentaJpaRepo extends JpaRepository<PregledPacijenta, Long> {
	
	

}
