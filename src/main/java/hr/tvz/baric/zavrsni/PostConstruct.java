package hr.tvz.baric.zavrsni;

import java.sql.Date;
import java.sql.Time;
import java.util.Calendar;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import hr.tvz.baric.zavrsni.model.Pregled;
import hr.tvz.baric.zavrsni.model.PregledPacijenta;
import hr.tvz.baric.zavrsni.model.Ustanova;
import hr.tvz.baric.zavrsni.repo.PregledJpaRepo;
import hr.tvz.baric.zavrsni.repo.PregledPacijentaJpaRepo;
import hr.tvz.baric.zavrsni.repo.UstanovaJpaRepo;

@Component
public class PostConstruct implements ApplicationListener<ContextRefreshedEvent> {
	
	@Autowired
	UstanovaJpaRepo ustanovaRepo;
	
	@Autowired
	PregledJpaRepo pregledRepo;
	
	@Autowired
	PregledPacijentaJpaRepo pregledPacijentaRepo;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		
		List<Pregled> pregledi = pregledRepo.findAll();		
		if (pregledi != null) {
			for (Pregled pregled : pregledi) {
				Long pregledId = pregled.getId();
//				List<PregledPacijenta> preglediPacijenta = pregledPacijentaRepo.findByPregled_Id(pregledId);
//				Date dateOfPregled = pregled.getNextDate();
//				Date datum = pregledPacijentaRepo.getLastDateOfThisPregled(dateOfPregled);
//				Long time = datum.getTime();
				Calendar calendar = Calendar.getInstance();
				calendar.set(Calendar.HOUR_OF_DAY, 8);
				calendar.set(Calendar.MINUTE, 0);
				calendar.set(Calendar.SECOND, 0);
				calendar.set(Calendar.MILLISECOND, 0);
				calendar.add(Calendar.HOUR, 24);
				Date nextDate = new Date(calendar.getTime().getTime());
				//nextDate.setMinutes(0);
				if (nextDate.getDay() == 6) {
					Calendar cal = Calendar.getInstance();
					cal.setTime(nextDate);
					cal.add(Calendar.DATE, 2);
					nextDate = new Date(cal.getTimeInMillis());
				} else if (nextDate.getDay() == 0) {
					Calendar cal = Calendar.getInstance();
					cal.setTime(nextDate);
					cal.add(Calendar.DATE, 1);
					nextDate = new Date(cal.getTimeInMillis());
				} 
//				else if (nextDay.getDay() == 3) {
//					Calendar cal = Calendar.getInstance();
//					cal.setTime(nextDay);
//					cal.add(Calendar.DATE, 4);
//					nextDay = new Date(cal.getTimeInMillis());
//				}
				Long nextDateTimestamp = nextDate.getTime();
				Long nextDateOfPregled = pregled.getNextDate();
				if (nextDateOfPregled == null || nextDateOfPregled < nextDateTimestamp) {
					nextDateOfPregled = nextDateTimestamp;
					pregled.setNextDate(nextDateOfPregled);
					pregledRepo.saveAndFlush(pregled);
				}
				//PregledPacijenta pregledPacijenta = pregledPacijentaRepo.findFirstByPregled_IdAndDateAfterOrderByDateDesc(pregledId, nextDate);
			}			
		}
		
	}
	
}
