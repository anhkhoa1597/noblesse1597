/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.cpp;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.BuildConfig;
import android.support.v4.content.FileProvider;
import android.util.Log;
import android.widget.Toast;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxHelper;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;

public class AppActivity extends Cocos2dxActivity {

    private static AppActivity app = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.setEnableVirtualButton(false);
        super.onCreate(savedInstanceState);

        app = this;
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            //  so just quietly finish and go away, dropping the user back into the activity
            //  at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        // DO OTHER INITIALIZATION BELOW
    }


    public static void showToast(final String i_msg)
    {
        app.runOnUiThread(new Runnable()
        {

            @Override
            public void run()
            {
                // TODO Auto-generated method stub
                Toast.makeText(app,i_msg, Toast.LENGTH_LONG).show();
            }
        });
    }

    public static void screenShot()
    {
        String path = Cocos2dxHelper.getCocos2dxWritablePath();

        Bitmap imageBitmap  = BitmapFactory.decodeFile(Cocos2dxHelper.getCocos2dxWritablePath() + "/phongthuy.png");

        if(imageBitmap == null)
        {
            return;
        }
//        try {
//            MediaStore.Images.Media.insertImage(getContext().getContentResolver(), imageBitmap, "phongthuy" , "");
//        } catch (Exception e) {
//            showToast(e.getMessage());
//        }
      //  MediaStore.Images.Media.insertImage(getContext().getContentResolver(), imageBitmap, "phongthuy" , "");
        String  outputFilePath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getPath();//+"/" +"PhongThuy/";//Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)

        File dir = new File (outputFilePath);

        if(!dir.exists())
        {
            dir.mkdirs();
        }

        File file = new File(outputFilePath +"/phongthuy.png");

        if(file.exists())
        {
            file.delete();
        }

        ByteArrayOutputStream bytes = new ByteArrayOutputStream();

        try
        {
            if(file.createNewFile())
            {
                FileOutputStream ostream = new FileOutputStream(file);
                imageBitmap.compress(Bitmap.CompressFormat.PNG, 100, ostream);
                ostream.write(bytes.toByteArray());
                ostream.close();
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        MediaScannerConnection.scanFile(getContext(), new String[]{file.toString()}, null,
                new MediaScannerConnection.OnScanCompletedListener() {
                    public void onScanCompleted(String path, Uri uri) {
                        Log.i("ExternalStorage", "Scanned " + path + ":");
                        Log.i("ExternalStorage", "-> uri=" + uri);
                    }
                });


        Uri phototUri = FileProvider.getUriForFile( app,  app.getApplicationContext().getPackageName() + ".fileprovider",file);//Uri.fromFile(file);
        Intent shareIntent = new Intent(Intent.ACTION_SEND);
        shareIntent.putExtra(Intent.EXTRA_STREAM, phototUri);
        shareIntent.setType("image/png");
        shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

        showToast("Ảnh lưu ở thư mục Picture! ");
//        //Toast.makeText(app.getApplicationContext(), "Ảnh lưu ở thư mục Downloads/PhongThuy ! ", Toast.LENGTH_LONG).show();
//        app.startActivity(Intent.createChooser(shareIntent, "Share Image"));
    }
}
