package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.Ustanova;

public interface UstanovaJpaRepo extends JpaRepository<Ustanova, Long>{
	
	public Ustanova findById(Long id);

}
