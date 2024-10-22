package at.melius.boundary;

import at.melius.model.Characteristic;
import at.melius.repository.CharacteristicRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/characteristics")
public class CharacteristicResource {

    @Inject
    CharacteristicRepository characteristicRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get")
    public List<Characteristic> getAllCharacteristics() {
        return this.characteristicRepository.getAllCharacteristics();
    }
}
