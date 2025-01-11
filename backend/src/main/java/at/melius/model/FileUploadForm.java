package at.melius.model;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

import java.sql.Blob;


public class FileUploadForm {
    public byte[] file;
    public String type;
}
