package hr.tvz.baric.zavrsni.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import hr.tvz.baric.zavrsni.model.Example;

public interface ExampleJpaRepo extends JpaRepository<Example, Long> {
	
	public Example findById(Integer id);
	public Example findByIme(String ime);

}
