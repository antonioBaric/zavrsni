package hr.tvz.baric.zavrsni.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.Odjel;
import hr.tvz.baric.zavrsni.model.Ustanova;

public interface OdjelJpaRepo extends JpaRepository<Odjel, Long>{
	
	public Odjel findById(Long id);
	public List<Odjel> findByActiveTrue();
	public Odjel findByIdAndActiveTrue(Long id);

}
