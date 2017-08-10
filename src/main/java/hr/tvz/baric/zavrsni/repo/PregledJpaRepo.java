package hr.tvz.baric.zavrsni.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.Pregled;

public interface PregledJpaRepo extends JpaRepository<Pregled, Long>{
	
	public Pregled findById(Long id);
	public List<Pregled> findByActiveTrue();

}
