import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class BFA
{
    // Fields
    private File dir; // Name of the dirctory containing files to be analyzed
    private long[] signatures = new long[256];
    private float[] normalizedSignatures = new float[256];
    private float[] tempNormalizedSignatures = new float[256];

    
    // Constructors
    public BFA(String path) throws IllegalArgumentException 
    {
        // Ensure path is valid
        if (path == null)
        {
            System.out.println("Path not specified!");
            throw new IllegalArgumentException();
        }
        
        // Ensure directory exists
        dir = new File(path);
        if (!dir.isDirectory())
        {
            System.out.println("Directory "+path+" not found!");
            throw new IllegalArgumentException();
        }
        
        // Initialize the signatures to zero
        for(int i=0;i<256;i++)
        {
            signatures[i] = 0;
            normalizedSignatures[i] = 0;
            tempNormalizedSignatures[i] = 0;
        }
    }
    
    // Computation flow for Byte Frequency analysis for set of files
    private boolean computeBFA()
    {
        boolean status = true;
        int count = 0; // Tracking number of files
        
        // Repeat the process for every file in a directory
        for (File f: dir.listFiles())
        {
            System.out.println("Processing file: "+f.getName());
            
            // Step-1
            status = computeByteFrequency(f);
            if (!status)
            {
                System.out.println("Byte Frequency Computation failed!");
            }
            
            // Step-2
            status = normalize();
            if (!status)
            {
                System.out.println("Normalization failed!");
            }
            
            // Step-3
            // Decide if companding required or not
            // If yes, which one a-law or u-law
            
            // Step-4
            // Apply companding
            
            // Step-5
            // Averge the normalized frequencey
            if (count != 0)
            {
                for(int i=0;i<256;i++)
                {
                    normalizedSignatures[i] += tempNormalizedSignatures[i];
                    normalizedSignatures[i] = normalizedSignatures[i]/2;
                }
            }
            else
            {
               for(int i=0;i<256;i++)
                {
                    normalizedSignatures[i] = tempNormalizedSignatures[i];
                }
            }
            printFqs();
            count++;
        }
        return status;
    }
    
    // Count byte frequency for each files in the diectory
    // Assumption: all files belong to same file type
    private boolean computeByteFrequency(File f)
    {
        boolean status = true;
        FileInputStream in = null;
        try 
        {
            in = new FileInputStream(f);
            int b;
            while ((b = in.read()) != -1)
                signatures[b] += 1;
        }
        catch (IOException e)
        {
            e.printStackTrace();
            System.out.println("IOException reading file: "+f.getName());
        }
        finally 
        {
            try
            {
                if (in != null)
                    in.close();
            }
            catch(IOException e)
            {
                 e.printStackTrace();
                System.out.println("IOException closing file: "+f.getName());
            }
        }
        
        // Right now always returning true. 
        // Failing to read one file does not mean entire fucntion failed.
        // Modify later if required
        return status;
    }
    
    // Normalize the frequency distribution
    // Divide every value by maximum frequency to normalize in range 0-1
    private boolean normalize()
    {
        boolean status = true;
        long max = 0;
        
        // Find max
        for (int i=0;i<256;i++)
        {
            if (max < signatures[i])
                max = signatures[i];
        }
        
        // Normalize
        for (int i=0;i<256;i++)
        {            
            tempNormalizedSignatures[i] = (float) signatures[i]/max;
        }
        
        // Right now always returning true. 
        // Modify later if required
        
        return status;
    }
    
    private void applyCompanding()
    {
        
    }
    
    private void alawCompanding()
    {
        
    }
    
    private void ulawCompanding()
    {
        
    }
    
    private void printFqs()
    {
        for (int i=0;i<8;i++)
        {
            for (int j=0;j<8;j++)
                System.out.print(normalizedSignatures[i*8+j]+" ");
            System.out.println("");
        }        
    }
    
    // Tester main method
    public static void main(String args[])
    {
        // Try MIME Type 1 directory e.g. PDF
        BFA mimeBfa = new BFA("C:\\stuff\\Git\\csci599-12\\HW1\\4\\pdf");       
        boolean status = mimeBfa.computeBFA();
        if (!status)
        {
            System.out.println("Byte Frequency analysis failed!");
        }
        
        // Try MIME Type 2 directory e.g. JPEG
        /*mimeBfa = new BFA("C:\\stuff\\Git\\csci599-12\\HW1\\4\\MIME_files");       
        status = mimeBfa.computeBFA();
        if (!status)
        {
            System.out.println("Byte Frequency analysis failed!");
        }
        
        // ... So on for 15 MIME types
        */
    }    
}