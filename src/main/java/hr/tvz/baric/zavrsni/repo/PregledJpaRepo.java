package hr.tvz.baric.zavrsni.repo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.Pregled;

@Transactional
public interface PregledJpaRepo extends JpaRepository<Pregled, Long>{
	
	public Pregled findById(Long id);
	public List<Pregled> findByActiveTrue();
	public Pregled findByIdAndActiveTrue(Long id);

}
