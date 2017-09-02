package hr.tvz.baric.zavrsni.repo;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import hr.tvz.baric.zavrsni.model.PregledPacijenta;

public interface PregledPacijentaJpaRepo extends JpaRepository<PregledPacijenta, Long> {
	
//	@Query("SELECT p.date FROM PregledPacijenta p WHERE p.date > :date ORDER BY p.date DESC LIMIT 1;")
//	public Date getLastDateOfThisPregled(@Param("date")Date date);
	
	public PregledPacijenta findFirstByPregled_IdAndDateAfterOrderByDateDesc(Long pregledId, Date date);
	
	public List<PregledPacijenta> findByPregled_Id(Long pregledId);
	
	@Query("SELECT p.date FROM PregledPacijenta p WHERE p.pregled.id = :pregledId")
	public List<Long> findDateByPregled_Id(@Param("pregledId")Long pregledId);
	
	public List<PregledPacijenta> findByDateAndPregled_Id(@Param("date")Long date, @Param("pregledId")Long pregledId);
	
	public List<PregledPacijenta> findByPregled_IdAndDateGreaterThan(Long pregledId, Long nextDateOfPregled);

}
