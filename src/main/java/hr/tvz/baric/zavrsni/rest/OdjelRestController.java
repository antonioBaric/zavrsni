package hr.tvz.baric.zavrsni.rest;

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
import hr.tvz.baric.zavrsni.model.Odjel;
import hr.tvz.baric.zavrsni.model.Ustanova;
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
	
	@GetMapping("/{odjelId}")
	public Odjel getOdjelById(@PathVariable Long odjelId){
		return odjelRepo.findById(odjelId);
	}
	
	@GetMapping("/nazivOdjela")
	public List<NazivOdjela> getAllNaziviOdjela() {
		List<NazivOdjela> nazivi = nazivOdjelaRepo.findAll();
		return nazivi;
	}
	
	@GetMapping("/active")
	public List<Odjel> getAllActiveOdjeli() {
		List<Odjel> activeOdjeli = odjelRepo.findByActiveTrue();
		return activeOdjeli;
	}
	
	@PutMapping
	public Odjel updateOdjel(@RequestBody Odjel odjel) {
		return odjelRepo.saveAndFlush(odjel);
	}
	
	@DeleteMapping("/{id}")
	public void deleteOdjel(@PathVariable Long id) {
		if (odjelRepo.findById(id) == null) {
			return;
		}
		
		odjelRepo.delete(id);
	}
	
	@GetMapping("/getUstanova/{id}")
	public Ustanova findUstanova(@PathVariable Long id) {
		Odjel odjel = odjelRepo.findById(id);
		Ustanova ustanova = odjel.getUstanova();
		return ustanova;
	}
	
	@GetMapping("/getUstanovaId/{id}")
	public Long findUstanovaId(@PathVariable Long id) {
		Odjel odjel = odjelRepo.findById(id);
		Ustanova ustanova = odjel.getUstanova();
		return ustanova.getId();
	}
	
	@GetMapping("/getUstanovaIme/{id}")
	public String findUstanovaIme(@PathVariable Long id) {
		Odjel odjel = odjelRepo.findById(id);
		Ustanova ustanova = odjel.getUstanova();
		Gson gson = new Gson();
		String string = gson.toJson(ustanova.getIme());
		return string;
	}
	
	@DeleteMapping("/nazivOdjela/{id}")
	public void deleteNazivOdjela(@PathVariable Long id) {
		if (odjelRepo.findById(id) == null) {
			return;
		}
		
		nazivOdjelaRepo.delete(id);
	}
	
	@PutMapping("/nazivOdjela")
	public NazivOdjela updateNazivOdjela(@RequestBody NazivOdjela nazivOdjela) {
		return nazivOdjelaRepo.saveAndFlush(nazivOdjela);
	}
	
	@PostMapping("/nazivOdjela")
	public NazivOdjela insertNewNazivOdjela(@RequestBody NazivOdjela nazivOdjela) {
		if (nazivOdjelaRepo.findByNaziv(nazivOdjela.getNaziv()) != null) {
			return null;
		}
		nazivOdjela.setId(null);
		return nazivOdjelaRepo.saveAndFlush(nazivOdjela);
	}

}
