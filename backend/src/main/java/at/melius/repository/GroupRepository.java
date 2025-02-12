package at.melius.repository;

import at.melius.model.Group;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class GroupRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public void createGroup(Group group) {
        this.entityManager.persist(group);
    }

    public List<Group> getAllGroups() {
        return this.entityManager.createNamedQuery(Group.QUERY_FIND_ALL, Group.class).getResultList();
    }

    public Group getGroupById(int id) {
        TypedQuery<Group> query = this.entityManager.createNamedQuery(Group.QUERY_FIND_BY_ID, Group.class);
        query.setParameter("id", id);
        return query.getSingleResult();

    }

    @Transactional
    public void updateGroup(Group group) {
        this.entityManager.merge(group);
    }

    public void deleteGroup(int id) {
        if(this.entityManager.find(Group.class, id) != null) {
            this.entityManager.remove(this.entityManager.find(Group.class, id));
        }
    }
}
