package at.melius.model;

import jakarta.persistence.Entity;
import jakarta.persistence.NamedQuery;

@NamedQuery(name=Software.QUERY_FIND_ALL, query="SELECT s FROM Software s")

@Entity
public class Software extends Selectable{

    public static final String QUERY_FIND_ALL = "Software.findAll";

}
