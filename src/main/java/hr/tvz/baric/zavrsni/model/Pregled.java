package hr.tvz.baric.zavrsni.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="PREGLED")
public class Pregled {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="PREGLED_ID", nullable = false)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="NAZIV_PREGLEDA", referencedColumnName="NAZIV_PREGLEDA_ID")
	private NazivPregleda nazivPregleda;
	
	@Column(name = "ACTIVE")
	private Boolean active;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="ODJEL", referencedColumnName = "ODJEL_ID")
	@JsonBackReference
	private Odjel odjel;
	
	@Column(name="OPIS")
	private String opis;
	
	@Column(name="NEXT_DATE")
	private Date nextDate;
	
//	@Column(name="STATUS")
//	private Boolean status;
	
	//STATUS, DATUM, VRIJEME...
	
	private Long idOdjela;
	
	private String imeOdjela;
	
	private Long idUstanove;
	
	private String imeUstanove;
	
	private String adresaUstanove;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public NazivPregleda getNazivPregleda() {
		return nazivPregleda;
	}

	public void setNazivPregleda(NazivPregleda nazivPregleda) {
		this.nazivPregleda = nazivPregleda;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Odjel getOdjel() {
		return odjel;
	}

	public void setOdjel(Odjel odjel) {
		this.odjel = odjel;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public Date getNextDate() {
		return nextDate;
	}

	public void setNextDate(Date nextDate) {
		this.nextDate = nextDate;
	}

	public Long getIdOdjela() {
		if (this.getOdjel() != null) {
			return this.getOdjel().getId();
		} else {
			return null;
		}
	}

	public String getImeOdjela() {
		if (this.getOdjel() != null) {
			return this.getOdjel().getNazivOdjela().getNaziv();
		} else {
			return null;
		}
	}

	public Long getIdUstanove() {
		if (this.getOdjel() != null) {
			if (this.getOdjel().getUstanova() != null) {
				return this.getOdjel().getUstanova().getId();
			} else {
			return null;
			}
		} else {
			return null;
		}
	}

	public String getImeUstanove() {
		if (this.getOdjel() != null) {
			if (this.getOdjel().getUstanova() != null) {
				return this.getOdjel().getUstanova().getIme();
			} else {
			return null;
			}
		} else {
			return null;
		}
	}

	public String getAdresaUstanove() {
		if (this.getOdjel() != null) {
			if (this.getOdjel().getUstanova() != null) {
				return this.getOdjel().getUstanova().getAdresa();
			} else {
			return null;
			}
		} else {
			return null;
		}
	}

//	public Boolean getStatus() {
//		return status;
//	}
//
//	public void setStatus(Boolean status) {
//		this.status = status;
//	}	

}
