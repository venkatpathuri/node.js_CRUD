const Post = require("../models/Post")

exports.createPosts=async(req,res,next)=>{

    try{

        const post=new Post(req.body)

        const postList=await post.save();

        res.status(201).json(postList)

    }

    catch(err){
        next(err)
    }

}

exports.getPosts=async(req,res,next)=>{

try{
    const {search,sort,order='asc',page=1,limit=5}=req.query
    const pipeline=[]

    pipeline.push(
      
    {
         $lookup:{

            from:'users_list',
            localField:'user',
            foreignField:'_id',
            as:'userDetails'

         }
    },
    {
        $unwind:"$userDetails"
    },
   
)
if(search){
pipeline.push(
     {
        $match:{
            "userDetails.name":{$regex:search,$options:"i"}
        }
    }
)
}

// pipeline.push({

//     $project:{
    
//         title:1,
//         category:1,
//         userDetails:1
         
//     }

// })
   
    // pipeline.push({
    //   $addFields: {
    //     popularity: {
    //       $cond: {
    //         if: { $gt: ["$views", 50] },
    //         then: "Popular",
    //         else: "Normal"
    //       }
    //     }
    //   }
    // });

//     pipeline.push({
//   $group: {
//     _id: "$category",
   
//     posts: {
//       $push: "$$ROOT"
//     },
//      totalPosts: { $sum: 1 },

   
//   }
// });


const sortField = sort?.trim() 
pipeline.push({

     $facet:{
        data:[
          { $sort: {[sortField]:order=='dsc' ? -1 : 1 } },
          {$skip:(page-1)*Number(limit)},
          {$limit:Number(limit)}
        ],        
        totalCount: [
          { $count: "count" }
        ]

     },
     

},


)



const posts=await Post.aggregate(pipeline).collation({ locale: 'en', strength: 2 });

res.status(200).json({
    success:true,
    data:posts
}
)
}
catch(err){
    next(err)
}

}