package at.melius.boundary;

import at.melius.model.Group;
import at.melius.repository.GroupRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import javax.print.attribute.standard.Media;
import java.util.List;

@Path("/groups")
public class GroupResource {

    @Inject
    GroupRepository groupRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createGroup(Group group) {
        this.groupRepository.createGroup(group);
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/update")
    public void updateGroup(Group group) {
        this.groupRepository.updateGroup(group);
    }

    @DELETE
    @Path("/delete/{id}")
    public void deleteGroup(@PathParam("id") int id) {
        this.groupRepository.deleteGroup(id);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getAll")
    @Transactional
    public List<Group> getAllGroups() {
        return this.groupRepository.getAllGroups();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    @Transactional
    public Group getGroup(@PathParam("id") int id) {
        return this.groupRepository.getGroupById(id);
    }
}
