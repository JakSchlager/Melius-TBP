package at.melius.model;

import jakarta.persistence.*;

import javax.sound.sampled.Port;

@Entity
public class Image {

    @Id
    @GeneratedValue
    private int id;

    @Lob
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "portfolio_id", referencedColumnName = "profile_id")
    private Portfolio portfolio;

    public Image() {
    }

    public Image( byte[] image, Portfolio portfolio) {
        setImage(image);
        setPortfolio(portfolio);
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
}
