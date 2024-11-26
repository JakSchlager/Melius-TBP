package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Set;

@NamedQuery(name = ProgrammingLanguage.QUERY_FIND_ALL, query = "SELECT p FROM ProgrammingLanguage p")

@Entity
public class ProgrammingLanguage extends Selectable{

    public static final String QUERY_FIND_ALL = "ProgrammingLanguage.findAll";

}
