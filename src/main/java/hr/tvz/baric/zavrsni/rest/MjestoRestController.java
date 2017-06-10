package hr.tvz.baric.zavrsni.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.tvz.baric.zavrsni.model.Mjesto;
import hr.tvz.baric.zavrsni.repo.MjestoJpaRepo;

@RestController
@RequestMapping("/api/mjesto")
public class MjestoRestController {
	
	@Autowired
	MjestoJpaRepo mjestoRepo;
	
	@GetMapping
	public List<Mjesto> getAllMjesto(){
		List<Mjesto> mjesta = mjestoRepo.findAll();
		return mjesta;
	}

}
