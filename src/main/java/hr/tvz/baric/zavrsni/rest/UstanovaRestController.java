package hr.tvz.baric.zavrsni.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public List<Ustanova> getAllUstanove(){
		List<Ustanova> ustanove = ustanovaRepo.findAll();
		return ustanove;
	}
	
	@GetMapping("/{ustanovaId}")
	public Ustanova getUstanovaByid(@PathVariable Long ustanovaId){
		return ustanovaRepo.findById(ustanovaId);
	}
	
	@GetMapping("/vrstaUstanove")
	public List<VrstaUstanove> getAllVrsteUstanove(){
		List<VrstaUstanove> vrsteUstanova = vrstaUstanoveRepo.findAll();
		return vrsteUstanova;
	}
	
	@GetMapping("/specijalizacijaUstanove")
	public List<SpecijalizacijaUstanove> getAllSpecUstanove() {
		List<SpecijalizacijaUstanove> specs = specijalizacijaUstanoveRepo.findAll();
		return specs;
	}

}
