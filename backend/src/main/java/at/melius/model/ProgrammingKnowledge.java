package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@NamedQuery(name = ProgrammingKnowledge.QUERY_FIND_BY_PROFILE_ID, query = "SELECT p FROM ProgrammingKnowledge p WHERE profile = :profile")

@Entity
public class ProgrammingKnowledge {

    public static final String QUERY_FIND_BY_PROFILE_ID = "ProgrammingKnowledgeQuery.findByProfileId";

    @Id
    @GeneratedValue
    private int id;

    private int rating;

    @ManyToOne
    private ProgrammingLanguage programming;

    public int getId() {
        return id;
    }

    @ManyToOne
    private Profile profile;

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public ProgrammingLanguage getProgramming() {
        return programming;
    }

    public void setProgramming(ProgrammingLanguage programming) {
        this.programming = programming;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}
