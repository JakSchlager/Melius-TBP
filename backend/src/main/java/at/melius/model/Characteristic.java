package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jdk.jfr.Name;

import java.util.Set;

@NamedQuery(name = Characteristic.QUERY_FIND_ALL, query = "SELECT c FROM Characteristic c")

@Entity
public class Characteristic {

    public static final String QUERY_FIND_ALL = "Characteristic.findAll";

    @Id
    @GeneratedValue
    private Long id;

    @ManyToMany
    @JoinTable(
            name="profile_characteristic",
            joinColumns = @JoinColumn(name="characteristic_id"),
            inverseJoinColumns = @JoinColumn(name="profile_id")
    )
    @JsonIgnoreProperties({"characteristics"})
    private Set<Profile> profiles;

    public Long getId() {
        return id;
    }

    private String label;

    private String value;

    public Set<Profile> getProfiles() {
        return profiles;
    }

    public void setProfile(Set<Profile> profiles) {
        this.profiles = profiles;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
