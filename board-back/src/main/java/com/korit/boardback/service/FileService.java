package com.korit.boardback.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {

    @Value("${user.dir}")
    private String rootPath;

    public String saveFile(String path, MultipartFile file) {
        if(file.isEmpty()) {
            return null;
        }

        String newFilename = null;
        try {
            String originalFilename = file.getOriginalFilename();
            newFilename = UUID.randomUUID().toString().replaceAll("-", "") + "_" + originalFilename;
            //uuid 범용 고유 식별자, uuid에는 -하이픈이 들어가있다.
            File newFilePath = new File(rootPath + "/" + path);
            if(!newFilePath.exists()) {
                newFilePath.mkdirs(); //폴더도 파일취급이라서 없는 경로에 파일명을 적을경우 폴더로 취급될 수 있어서 경로 폴더를 만들어준다.
            }
            File newFile = new File(rootPath + "/" + path + "/" + newFilename);
            file.transferTo(newFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return newFilename;
    }


    public void deleteFile(String path) {
        File file = new File(rootPath + "/" + path);
        if(file.exists()) {
            file.delete();
        }
    }
}
