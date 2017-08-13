package hr.tvz.baric.zavrsni.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.Ustanova;

public interface UstanovaJpaRepo extends JpaRepository<Ustanova, Long>{
	
	public Ustanova findById(Long id);
	public List<Ustanova> findByActiveTrue();
	public Ustanova findByIdAndActiveTrue(Long id);

}
