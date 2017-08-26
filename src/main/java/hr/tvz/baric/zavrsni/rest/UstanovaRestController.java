package hr.tvz.baric.zavrsni.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.baric.zavrsni.model.SpecijalizacijaUstanove;
import hr.tvz.baric.zavrsni.model.Ustanova;
import hr.tvz.baric.zavrsni.model.VrstaUstanove;
import hr.tvz.baric.zavrsni.repo.SpecijalizacijaUstanoveJpaRepo;
import hr.tvz.baric.zavrsni.repo.UstanovaJpaRepo;
import hr.tvz.baric.zavrsni.repo.VrstaUstanoveJpaRepo;

@RestController
@RequestMapping("/api/ustanova")
public class UstanovaRestController {
	
	@Autowired
	UstanovaJpaRepo ustanovaRepo;
	
	@Autowired
	VrstaUstanoveJpaRepo vrstaUstanoveRepo;
	
	@Autowired
	SpecijalizacijaUstanoveJpaRepo specijalizacijaUstanoveRepo;
	
	@GetMapping
	//@PreAuthorize("hasAuthority('admin') or hasAuthority('doktor')")
	@PreAuthorize("hasAuthority('admin')")
	public List<Ustanova> getAllUstanove(){
		List<Ustanova> ustanove = ustanovaRepo.findAll();
		return ustanove;
	}
	
	@GetMapping("/active")
	public List<Ustanova> getAllActiveUstanove() {
		List<Ustanova> activeUstanove = ustanovaRepo.findByActiveTrue();
		return activeUstanove;
	}
	
	@GetMapping("/{ustanovaId}")
	@PreAuthorize("hasAuthority('admin')")
	public Ustanova getUstanovaByid(@PathVariable Long ustanovaId){
		return ustanovaRepo.findById(ustanovaId);
	}
	
	@GetMapping("/active/{ustanovaId}")
	public Ustanova getActiveUstanovaById(@PathVariable Long ustanovaId) {
		return ustanovaRepo.findByIdAndActiveTrue(ustanovaId);
	}
	
	@GetMapping("/vrstaUstanove")
	//@PreAuthorize("hasAuthority('admin')")
	public List<VrstaUstanove> getAllVrsteUstanove(){
		List<VrstaUstanove> vrsteUstanova = vrstaUstanoveRepo.findAll();
		return vrsteUstanova;
	}
	
	@GetMapping("/specijalizacijaUstanove")
	//@PreAuthorize("hasAuthority('admin')")
	public List<SpecijalizacijaUstanove> getAllSpecUstanove() {
		List<SpecijalizacijaUstanove> specs = specijalizacijaUstanoveRepo.findAll();
		return specs;
	}
	
	@PutMapping
	@PreAuthorize("hasAuthority('admin')")
	public Ustanova updateUstanova(@RequestBody Ustanova ustanova) {
		return ustanovaRepo.saveAndFlush(ustanova);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('admin')")
	public void deleteUstanova(@PathVariable Long id) {
		if (ustanovaRepo.findById(id) == null) {
			return;
		}
		
		ustanovaRepo.delete(id);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('admin')")
	public Ustanova insertNewUstanova(@RequestBody Ustanova ustanova) {
		if (true) {
			
		}
		
		return ustanovaRepo.saveAndFlush(ustanova);
	}

}
