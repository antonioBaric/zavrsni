package hr.tvz.baric.zavrsni.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.baric.zavrsni.model.NazivOdjela;
import hr.tvz.baric.zavrsni.model.Odjel;
import hr.tvz.baric.zavrsni.repo.NazivOdjelaJpaRepo;
import hr.tvz.baric.zavrsni.repo.OdjelJpaRepo;

@RestController
@RequestMapping("/api/odjel")
public class OdjelRestController {
	
	@Autowired
	OdjelJpaRepo odjelRepo;
	
	@Autowired
	NazivOdjelaJpaRepo nazivOdjelaRepo;
	
	@GetMapping
	public List<Odjel> getAllOdjeli() {
		List<Odjel> odjeli = odjelRepo.findAll();
		return odjeli;
	}
	
	@GetMapping("/nazivOdjela")
	public List<NazivOdjela> getAllNaziviOdjela() {
		List<NazivOdjela> nazivi = nazivOdjelaRepo.findAll();
		return nazivi;
	}

}
