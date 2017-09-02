package hr.tvz.baric.zavrsni.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.baric.zavrsni.model.PregledPacijenta;
import hr.tvz.baric.zavrsni.repo.PregledPacijentaJpaRepo;

@RestController
@RequestMapping("/api/pregledPacijenta")
public class PregledPacijentaRestController {
	
	@Autowired
	PregledPacijentaJpaRepo pregledPacijentaJpa;
	
	@GetMapping("/checkIfDateOfPregledIsAvailable/{pregledId}/{pickedDateTimestamp}")
	public Boolean checkIfDateOfPregledIsAvailable(@PathVariable("pickedDateTimestamp")Long pickedDateTimestamp, @PathVariable("pregledId")Long pregledId){
		List<PregledPacijenta> existingPregled = pregledPacijentaJpa.findByDateAndPregled_Id(pickedDateTimestamp, pregledId);
		
		if (!existingPregled.isEmpty() || existingPregled.size() > 0) {
			return false;
		} else {
			return true;
		}
	}

}
