# library sevenbridges API
import sevenbridges as sbg
# link my API
xyApi=sbg.Api(url='https://cavatica-api.sbgenomics.com/v2',token='d6a1bc927ca84f46b15ae270567d3ed6')


# list my project
xyProjects = xyApi.projects.query()
for project in xyProjects.all():
    print (project.id)

# get the test project file information   ("all" can list all files, but "limit" just list 100 files)
files=xyApi.files.query(project='xiaoyanhuang0106/bgi-practise-target-xiaoyan').all()
# get target files name
file_list=[file.name for file in files]

# get source files
new_files=xyApi.files.query(project='yuankun/bgi-practise-source').all()

# get target-source files
target_file=[new_file for new_file in new_files if new_file.name in file_list]

# copy target files

##  wrong(AttributeError: 'list' object has no attribute 'copy')
result_file=target_file.copy(project="xiaoyanhuang0106/target-xiaoyan")

## solution
for i in range(0,len(target_file)): 
    target_file[i].copy(project="xiaoyanhuang0106/target-xiaoyan")
