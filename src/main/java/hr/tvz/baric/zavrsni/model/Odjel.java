package hr.tvz.baric.zavrsni.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="ODJEL")
public class Odjel {
	
	@Id
	@Column(name="ODJEL_ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="NAZIV_ODJELA", referencedColumnName = "NAZIV_ODJELA_ID")
	private NazivOdjela nazivOdjela;
	
	@Column(name = "ACTIVE")
	private Boolean active;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="USTANOVA", referencedColumnName = "USTANOVA_ID")
	@JsonBackReference
	private Ustanova ustanova;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "odjel", cascade = CascadeType.REMOVE)
	@JsonManagedReference
	private List<Pregled> pregledi;
	
//	@Column(name="PRIVATNI_OPIS_ODJELA")
//	private String privatniOpisOdjela;
	
	@Column(name="telefon")
	private String telefon;
	
	@Column(name="email")
	private String email;
	
	@Column(name="ZGRADA_BOLNICE")
	private String zgradaBolnice;
	
	@Column(name="kat")
	private Integer kat;
	
	@Transient
	private String nazivUstanove;
	
	@Transient
	private Long idUstanove;
	
	public Odjel() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public NazivOdjela getNazivOdjela() {
		return nazivOdjela;
	}

	public void setNazivOdjela(NazivOdjela nazivOdjela) {
		this.nazivOdjela = nazivOdjela;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public List<Pregled> getPregledi() {
		return pregledi;
	}

	public void setPregledi(List<Pregled> pregledi) {
		this.pregledi = pregledi;
	}

//	public String getPrivatniOpisOdjela() {
//		return privatniOpisOdjela;
//	}
//
//	public void setPrivatniOpisOdjela(String privatniOpisOdjela) {
//		this.privatniOpisOdjela = privatniOpisOdjela;
//	}

	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getZgradaBolnice() {
		return zgradaBolnice;
	}

	public void setZgradaBolnice(String zgradaBolnice) {
		this.zgradaBolnice = zgradaBolnice;
	}

	public Integer getKat() {
		return kat;
	}

	public void setKat(Integer kat) {
		this.kat = kat;
	}

	public Ustanova getUstanova() {
		return ustanova;
	}

	public void setUstanova(Ustanova ustanova) {
		this.ustanova = ustanova;
	}

	public String getNazivUstanove() {
		if (this.getUstanova() != null) {
			return this.getUstanova().getIme();
		} else {
			return "";
		}
	}

	public Long getIdUstanove() {
		if (this.getUstanova() != null) {
			return this.getUstanova().getId();
		} else {
			return null;
		}
	};
	
	

}
