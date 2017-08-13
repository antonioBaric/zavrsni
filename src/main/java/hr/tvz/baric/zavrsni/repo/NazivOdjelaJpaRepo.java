package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.NazivOdjela;

public interface NazivOdjelaJpaRepo extends JpaRepository<NazivOdjela, Long>{
	
	public NazivOdjela findByNaziv(String naziv);
	public NazivOdjela findById(Long id);

}
