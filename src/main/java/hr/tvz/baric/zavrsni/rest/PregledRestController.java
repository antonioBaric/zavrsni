package hr.tvz.baric.zavrsni.rest;

import static org.hamcrest.CoreMatchers.nullValue;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import hr.tvz.baric.zavrsni.model.NazivOdjela;
import hr.tvz.baric.zavrsni.model.NazivPregleda;
import hr.tvz.baric.zavrsni.model.Odjel;
import hr.tvz.baric.zavrsni.model.Pregled;
import hr.tvz.baric.zavrsni.model.Ustanova;
import hr.tvz.baric.zavrsni.repo.NazivPregledaJpaRepo;
import hr.tvz.baric.zavrsni.repo.OdjelJpaRepo;
import hr.tvz.baric.zavrsni.repo.PregledJpaRepo;

@RestController
@RequestMapping("/api/pregled")
public class PregledRestController {
	
	@Autowired
	PregledJpaRepo pregledJpaRepo;
	
	@Autowired
	NazivPregledaJpaRepo nazivPregledaJpaRepo;
	
	@Autowired
	OdjelJpaRepo odjelJpaRepo;
	
	@GetMapping
	public List<Pregled> getAllPreglede() {
		List<Pregled> pregledi = pregledJpaRepo.findAll();
		return pregledi;
	}
	
	@GetMapping("/{pregledId}")
	public Pregled getPregledById(@PathVariable Long pregledId){
		Pregled pregled = pregledJpaRepo.findById(pregledId);
		return pregled;
	}
	
	@GetMapping("/nazivPregleda")
	public List<NazivPregleda> getAllNazivPregleda() {
		List<NazivPregleda> naziviPregleda = nazivPregledaJpaRepo.findAll();
		return naziviPregleda;
	}
	
	@GetMapping("/active")
	public List<Pregled> getAllActivePregledi() {
		List<Pregled> activePregledi = pregledJpaRepo.findByActiveTrue();
		return activePregledi;
	}
	
	@GetMapping("/active/{pregledId}")
	public Pregled getActiveUPregledById(@PathVariable Long pregledId) {
		return pregledJpaRepo.findByIdAndActiveTrue(pregledId);
	}
	
	@PostMapping("/{odjelId}")
	public Pregled insertNewPregled(@RequestBody Pregled newPregled, @PathVariable Long odjelId) {
		Odjel odjel = odjelJpaRepo.findById(odjelId);
		newPregled.setId(null);
		newPregled.setOdjel(odjel);
		newPregled = pregledJpaRepo.saveAndFlush(newPregled);
		return newPregled;
	}
	
	@PutMapping
	public Pregled updatePregled(@RequestBody Pregled pregled) {
		Odjel odjel = pregledJpaRepo.findById(pregled.getId()).getOdjel();
		if (pregled.getOdjel() == null) {
			pregled.setOdjel(odjel);
		}
		return pregledJpaRepo.saveAndFlush(pregled);
	}
	
	@DeleteMapping("/{id}")
	public void deletePrelged(@PathVariable Long id) {
		if (pregledJpaRepo.findById(id) == null) {
			return;
		}
		Pregled pregled = pregledJpaRepo.findById(id);
		pregled.setOdjel(null);
		pregledJpaRepo.delete(id);
	}
	
	@GetMapping("/getOdjel/{id}")
	public Odjel findOdjel(@PathVariable Long id) {
		Pregled pregled = pregledJpaRepo.findById(id);
		Odjel odjel = pregled.getOdjel();
		return odjel;
	}
	
	@GetMapping("/getOdjelId/{id}")
	public Long findOdjelId(@PathVariable Long id) {
		Pregled pregled = pregledJpaRepo.findById(id);
		Odjel odjel = pregled.getOdjel();
		return odjel.getId();
	}
	
	@GetMapping("/getOdjelIme/{id}")
	public String findOdjelIme(@PathVariable Long id) {
		Pregled pregled = pregledJpaRepo.findById(id);
		Odjel odjel = pregled.getOdjel();
		Gson gson = new Gson();
		String string = gson.toJson(odjel.getNazivOdjela().getNaziv());
		return string;
	}
	
	@PostMapping("/nazivPregleda")
	public NazivPregleda insertNewNazivPregelda(@RequestBody NazivPregleda nazivPregleda) {
		if (nazivPregledaJpaRepo.findByNaziv(nazivPregleda.getNaziv()) != null) {
			return null;
		}
		nazivPregleda.setId(null);
		return nazivPregledaJpaRepo.saveAndFlush(nazivPregleda);
	}
	
	@PutMapping("/nazivPregleda")
	public NazivPregleda updateNazivPregleda(@RequestBody NazivPregleda nazivPregleda) {
		return nazivPregledaJpaRepo.saveAndFlush(nazivPregleda);
	}
	

}
