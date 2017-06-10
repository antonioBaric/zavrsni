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
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name="USTANOVA", referencedColumnName = "USTANOVA_ID")
	@JsonBackReference
	private Ustanova ustanova;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "odjel", cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<Pregled> pregledi;
	
	@Column(name="PRIVATNI_OPIS_ODJELA")
	private String privatniOpisOdjela;
	
	@Column(name="telefon")
	private String telefon;
	
	@Column(name="email")
	private String email;
	
	@Column(name="ZGRADA_BOLNICE")
	private String zgradaBolnice;
	
	@Column(name="kat")
	private Integer kat;
	
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

	public String getPrivatniOpisOdjela() {
		return privatniOpisOdjela;
	}

	public void setPrivatniOpisOdjela(String privatniOpisOdjela) {
		this.privatniOpisOdjela = privatniOpisOdjela;
	}

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
	};
	
	

}
