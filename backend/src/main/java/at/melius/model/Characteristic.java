package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jdk.jfr.Name;

import java.util.Set;

@NamedQuery(name = Characteristic.QUERY_FIND_ALL, query = "SELECT c FROM Characteristic c")

@Entity
public class Characteristic extends Selectable {

    public static final String QUERY_FIND_ALL = "Characteristic.findAll";

    @ManyToMany
    @JoinTable(
            name="profile_characteristic",
            joinColumns = @JoinColumn(name="characteristic_id"),
            inverseJoinColumns = @JoinColumn(name="profile_id")
    )
    @JsonIgnoreProperties({"characteristics"})
    private Set<Profile> profiles;

    public Set<Profile> getProfiles() {
        return profiles;
    }

    public void setProfile(Set<Profile> profiles) {
        this.profiles = profiles;
    }

}
