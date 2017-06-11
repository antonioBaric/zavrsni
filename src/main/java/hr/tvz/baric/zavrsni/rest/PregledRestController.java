package hr.tvz.baric.zavrsni.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.baric.zavrsni.model.NazivPregleda;
import hr.tvz.baric.zavrsni.model.Pregled;
import hr.tvz.baric.zavrsni.repo.NazivPregledaJpaRepo;
import hr.tvz.baric.zavrsni.repo.PregledJpaRepo;

@RestController
@RequestMapping("/api/pregled")
public class PregledRestController {
	
	@Autowired
	PregledJpaRepo pregledJpaRepo;
	
	@Autowired
	NazivPregledaJpaRepo nazivPregledaJpaRepo;
	
	@GetMapping
	public List<Pregled> getAllPreglede() {
		List<Pregled> pregledi = pregledJpaRepo.findAll();
		return pregledi;
	}
	
	@GetMapping("/nazivPregleda")
	public List<NazivPregleda> getAllNazivPregleda() {
		List<NazivPregleda> naziviPregleda = nazivPregledaJpaRepo.findAll();
		return naziviPregleda;
	}
	

}
