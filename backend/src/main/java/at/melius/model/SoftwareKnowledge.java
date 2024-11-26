package at.melius.model;

import jakarta.persistence.*;

@NamedQuery(name=SoftwareKnowledge.QUERY_FIND_BY_PROFILE_ID, query = "SELECT s FROM SoftwareKnowledge s WHERE profile = :profile")

@Entity
public class SoftwareKnowledge {

    public static final String QUERY_FIND_BY_PROFILE_ID = "SoftwareKnowledge.findByProfileId";

    @Id
    @GeneratedValue
    private int id;

    private int rating;

    @ManyToOne
    private Software software;

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

    public Software getSoftware() {
        return software;
    }

    public void setSoftware(Software software) {
        this.software = software;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }
}
