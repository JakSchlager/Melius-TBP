package at.melius.DTO;

import jakarta.ws.rs.FormParam;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import java.io.InputStream;

public class ImageUploadDTO {
    @FormParam("file")
    @PartType("image/png")
    public InputStream file;

    public String position;
}
