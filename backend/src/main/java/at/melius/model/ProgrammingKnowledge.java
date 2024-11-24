package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Set;

@NamedQuery(name = ProgrammingKnowledge.QUERY_FIND_ALL, query = "SELECT p FROM ProgrammingKnowledge p")

@Entity
public class ProgrammingKnowledge extends Selectable{

    public static final String QUERY_FIND_ALL = "ProgrammingKnowledge.findAll";

    @ManyToMany
    @JoinTable(
            name="profile_programming",
            joinColumns = @JoinColumn(name="programming_id"),
            inverseJoinColumns = @JoinColumn(name="profile_id")
    )
    @JsonIgnoreProperties({"programming"})
    private Set<Profile> profiles;

    public Set<Profile> getProfiles() {
        return profiles;
    }

    public void setProfiles(Set<Profile> profiles) {
        this.profiles = profiles;
    }
}
