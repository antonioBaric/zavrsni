package hr.tvz.baric.zavrsni.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.baric.zavrsni.repo.PregledPacijentaJpaRepo;

@RestController
@RequestMapping("/api/pregledPacijenta")
public class PregledPacijentaRestController {
	
	@Autowired
	PregledPacijentaJpaRepo pregledPacijentaJpa;
	
	

}
