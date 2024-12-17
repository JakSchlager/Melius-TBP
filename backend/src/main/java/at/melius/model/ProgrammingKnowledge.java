package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class ProgrammingKnowledge {

    @Id
    @GeneratedValue
    private int id;

    private int rating;

    @ManyToOne
    private ProgrammingLanguage programming;

    public int getId() {
        return id;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    private Portfolio portfolio;

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

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }
}
