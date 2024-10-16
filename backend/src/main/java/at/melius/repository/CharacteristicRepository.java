package at.melius.repository;

import at.melius.model.Characteristic;
import at.melius.model.Profile;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;

import java.util.List;

@ApplicationScoped
public class CharacteristicRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void addCharacteristic(Characteristic characteristic) {
        if(this.entityManager.find(Characteristic.class, characteristic.getId()) == null) {
            entityManager.persist(characteristic);
        } else {
            throw new BadRequestException("Characteristic with label " + characteristic.getLabel() + " already exists");
        }
    }

    @Transactional
    public void deleteCharacteristic(Characteristic characteristic) {
        if(this.entityManager.find(Characteristic.class, characteristic.getId()) != null) {
            entityManager.remove(characteristic);
        }
    }

    public List<Characteristic> getAllCharacteristics() {
        TypedQuery<Characteristic> query = this.entityManager.createNamedQuery(Characteristic.QUERY_FIND_ALL, Characteristic.class);
        return query.getResultList();
    }
}
