package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.NazivPregleda;

public interface NazivPregledaJpaRepo extends JpaRepository<NazivPregleda, Long>{
	
	public NazivPregleda findByNaziv(String naziv);

}
