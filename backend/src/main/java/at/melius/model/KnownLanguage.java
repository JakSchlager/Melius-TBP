package at.melius.model;

import jakarta.persistence.*;

@NamedQuery(name = KnownLanguage.QUERY_FIND_BY_USER, query = "SELECT k FROM KnownLanguage k WHERE profile = :profile")

@Entity
public class KnownLanguage {

    public static final String QUERY_FIND_BY_USER = "KnownLanguage.findByUser";

    @Id
    @GeneratedValue
    private int id;

    private String language;

    private int rating;

    @ManyToOne(fetch = FetchType.LAZY)
    private Profile profile;

    public int getId() {
        return id;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
