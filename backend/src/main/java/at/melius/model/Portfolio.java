package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.jboss.resteasy.spi.touri.MappedBy;

import java.util.Set;

@Entity
public class Portfolio {

    @Id
    @OneToOne
    @JoinColumn(name="profile_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"portfolio"}, allowSetters = true)
    private Profile profile;

    @OneToOne
    @JoinColumn(name="generalInfo_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"portfolio"}, allowSetters = true)
    private GeneralInfo generalInfo;

    private String generalInfoPosition;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<Education> educations;

    private String educationsPosition;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<WorkExperience> workExperiences;

    private String workExperiencesPosition;

    @ManyToMany
    @JoinTable(
            name="portfolio_characteristic",
            joinColumns = @JoinColumn(name="portfolio_id"),
            inverseJoinColumns = @JoinColumn(name="characteristic_id")
    )
    @JsonIgnoreProperties({"portfolio"})
    private Set<Characteristic> characteristics;

    private String characteristicsPosition;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<KnownLanguage> knownLanguages;

    private String knownLanguagesPosition;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<ProgrammingKnowledge> programmingKnowledges;

    private String programmingKnowledgesPosition;

    @OneToMany(mappedBy = "portfolio")
    @JsonIgnoreProperties({"portfolio"})
    private Set<SoftwareKnowledge> softwareKnowledges;

    private String softwareKnowledgesPosition;

    public Set<Characteristic> getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(Set<Characteristic> characteristics) {
        this.characteristics = characteristics;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public GeneralInfo getGeneralInfo() {
        return generalInfo;
    }

    public void setGeneralInfo(GeneralInfo generalInfo) {
        this.generalInfo = generalInfo;
    }

    public Set<Education> getEducations() {
        return educations;
    }

    public void setEducations(Set<Education> educations) {
        this.educations = educations;
    }

    public Set<WorkExperience> getWorkExperiences() {
        return workExperiences;
    }

    public void setWorkExperiences(Set<WorkExperience> workExperiences) {
        this.workExperiences = workExperiences;
    }

    public Set<KnownLanguage> getKnownLanguages() {
        return knownLanguages;
    }

    public void setKnownLanguages(Set<KnownLanguage> knownLanguages) {
        this.knownLanguages = knownLanguages;
    }

    public Set<ProgrammingKnowledge> getProgrammingKnowledges() {
        return programmingKnowledges;
    }

    public void setProgrammingKnowledges(Set<ProgrammingKnowledge> programmingKnowledges) {
        this.programmingKnowledges = programmingKnowledges;
    }

    public Set<SoftwareKnowledge> getSoftwareKnowledges() {
        return softwareKnowledges;
    }

    public void setSoftwareKnowledges(Set<SoftwareKnowledge> softwareKnowledges) {
        this.softwareKnowledges = softwareKnowledges;
    }

    public String getGeneralInfoPosition() {
        return generalInfoPosition;
    }

    public void setGeneralInfoPosition(String generalInfoPosition) {
        this.generalInfoPosition = generalInfoPosition;
    }

    public String getEducationsPosition() {
        return educationsPosition;
    }

    public void setEducationsPosition(String educationsPosition) {
        this.educationsPosition = educationsPosition;
    }

    public String getWorkExperiencesPosition() {
        return workExperiencesPosition;
    }

    public void setWorkExperiencesPosition(String workExperiencesPosition) {
        this.workExperiencesPosition = workExperiencesPosition;
    }

    public String getCharacteristicsPosition() {
        return characteristicsPosition;
    }

    public void setCharacteristicsPosition(String characteristicsPosition) {
        this.characteristicsPosition = characteristicsPosition;
    }

    public String getKnownLanguagesPosition() {
        return knownLanguagesPosition;
    }

    public void setKnownLanguagesPosition(String knownLanguagesPosition) {
        this.knownLanguagesPosition = knownLanguagesPosition;
    }

    public String getProgrammingKnowledgesPosition() {
        return programmingKnowledgesPosition;
    }

    public void setProgrammingKnowledgesPosition(String programmingKnowledgesPosition) {
        this.programmingKnowledgesPosition = programmingKnowledgesPosition;
    }

    public String getSoftwareKnowledgesPosition() {
        return softwareKnowledgesPosition;
    }

    public void setSoftwareKnowledgesPosition(String softwareKnowledgesPosition) {
        this.softwareKnowledgesPosition = softwareKnowledgesPosition;
    }
}
