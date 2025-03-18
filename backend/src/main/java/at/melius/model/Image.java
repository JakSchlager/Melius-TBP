package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import javax.sound.sampled.Port;

@NamedQuery(name = Image.QUERY_FIND_BY_PORTFOLIO_ID, query ="Select i FROM Image i WHERE portfolio = :portfolio" )

@Entity
public class Image {

    public static final String QUERY_FIND_BY_PORTFOLIO_ID = "Image.findByPortfolioId";

    @Id
    @GeneratedValue
    private int id;

    @Lob
    private byte[] image;

    @ManyToOne(fetch = FetchType.LAZY)
    private Portfolio portfolio;

    private String position;

    public Image() {
    }

    public Image(byte[] image, Portfolio portfolio, String position) {
        setImage(image);
        setPortfolio(portfolio);
        setPosition(position);
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
