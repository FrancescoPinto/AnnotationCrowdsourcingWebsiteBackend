/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.respository;

import awt.server.model.Campaign;
import awt.server.model.Image;
import awt.server.model.Master;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Repository;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Utente
 */
@Repository
public class ImageRepositoryImpl implements ImageRepository {
    
    private final Path rootLocation = Paths.get("C:"+File.separator +"AWTServer"+File.separator+"image"+File.separator);
    
    @PersistenceContext 
    EntityManager em;
    
    @Override
    public Image store(MultipartFile file, Master m, Campaign c){
       try{
            Image im = new Image();
            em.persist(im);
            im.setFilePath(rootLocation.resolve(c.getId()+"_"+im.getId()+".jpg").toString());
            im.setCanonical(rootLocation.resolve(c.getId()+"_"+im.getId()+".jpg").toString());
            im.setCampaign(c);
            Files.copy(file.getInputStream(), this.rootLocation.resolve(c.getId()+"_"+im.getId()+".jpg"));
            return im;
            
            /*int i = 1;
            File temp = rootLocation.resolve(c.getId()+"_"+i+".jpg").toFile();//file.getOriginalFilename()+i+"_"+m.getId()+"_"+c.getId()).toFile();
            if(!temp.exists())
            {
                Files.copy(file.getInputStream(), this.rootLocation.resolve(c.getId()+"_"+i+".jpg");//file.getOriginalFilename()+i+"_"+m.getId()+"_"+c.getId()));
                        String filepath = rootLocation.resolve(file.getOriginalFilename()+i+"_"+m.getId()+"_"+c.getId()).toString();
                        Image im = new Image(filepath,filepath,c);
                        em.persist(im);
                        return im;
            }else{
                while(temp.exists()){
                    i++;
                    temp = rootLocation.resolve(file.getOriginalFilename()+i+"_"+m.getId()+"_"+c.getId()).toFile();
                    if(!temp.exists()){
                        Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()+i+"_"+m.getId()+"_"+c.getId()));
                        String filepath = rootLocation.resolve(file.getOriginalFilename()+i+"_"+m.getId()+"_"+c.getId()).toString();
                        Image im = new Image(filepath,filepath,c);
                        em.persist(im);
                        return im;
                    }
                }
            }
            
            return null;
            
        */}catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
    
     @Override
    public Resource loadFile(String filename){
        try{
                Path file = rootLocation.resolve(filename);
                Resource resource = new UrlResource(file.toUri());
                if(resource.exists() || resource.isReadable()){
                    return resource;
                }else{
                    throw new RuntimeException("Resource not found!");
                }
            }catch(MalformedURLException e){
                    throw new RuntimeException(e.getMessage());
            }
    }
    
     @Override
    public void deleteAll(){
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }
    
     @Override
    public void init(){
        //try{
            if(Files.exists(rootLocation))
                return;
            else 
                rootLocation.toFile().mkdirs();
             
                //Files.createDirectory(rootLocation);
       // }catch(IOException e){
       //     throw new RuntimeException("Could not initialize storage!");
       // }
    }
    
    @Override
    public String getFilePathString(Long campaignId, Long imageId){
        return rootLocation.resolve(campaignId+"_"+imageId+".jpg").toString();
    }
}
